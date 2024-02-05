"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluator = void 0;
const Functions_1 = require("./Functions");
const bnf_1 = require("@ebavel/bnf");
const calculator_abnf_1 = __importDefault(require("./calculator.abnf"));
const Evaluator = class extends Functions_1.Functions {
    constructor(options) {
        super();
        this.endpoint = null;
        this.form = null;
        this.model = {};
        this._result = {
            formula: '',
            value: null,
        };
        this.endpoint = options.endpoint;
        this.model = options.model || {};
        this.form = options.form;
        //Load bnf file, this can be done inline//
        this.compiler = new bnf_1.Compiler();
        this.compiler.AddLanguage(calculator_abnf_1.default, "calc");
        this.setRules();
        return new Proxy(this, {
            get: function (self, prop) {
                if (prop in self)
                    return self[prop]; // normal case
                prop = `fn` + prop.slice(2).charAt(0).toUpperCase() + (prop.slice(3) || '').toLowerCase();
                if (prop in self)
                    return self[prop];
                console.error(`Property not found ${prop}`);
            }
        });
    }
    cal(formula) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.compiler.AsyncParseScript(formula.trim());
            }
            catch (error) {
                console.log(`FN Cal error: ${error}`);
            }
            return this._result.value;
        });
    }
    setRules() {
        const self = this;
        this.compiler.SetRuleEvents({
            SYNTAX(token) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let result = yield self.eval(token.value);
                        result = Number.isNaN(result) ? undefined : result;
                        self._result = { formula: token.value, value: result };
                    }
                    catch (error) {
                        self._result = { formula: token.value, error: error.toString(), value: null };
                    }
                });
            },
            Field(token) {
                token.SetReplaceValue(`self.getValueModel("${token.Child('FieldName').value}")`);
            },
            CallFunction(token) {
                var _a;
                let methodName = token.Child('methodName').value;
                methodName = methodName.charAt(0).toUpperCase() + methodName.slice(1).toLowerCase();
                const methodArgs = (_a = token.Child('methodArgs')) === null || _a === void 0 ? void 0 : _a.value;
                token.SetReplaceValue(`yield self.fn${methodName}(${methodArgs ? methodArgs : ''})`);
            },
            logical_operator(token) {
                if (token.value == 'and') {
                    token.SetReplaceValue('&&');
                }
                if (token.value == 'or') {
                    token.SetReplaceValue('||');
                }
            }
        });
    }
    eval(formula) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            let code = `var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    
    const myWrapperFunction = () => __awaiter(void 0, void 0, void 0, function* () {
      return ${formula}
    });

    return myWrapperFunction()`;
            const getAsyncFunction = function () {
                return __awaiter(this, void 0, void 0, function* () { });
            }.constructor('self', code);
            return getAsyncFunction(this);
        });
    }
    getValueModel(prop) {
        return this.model[prop];
    }
};
exports.Evaluator = Evaluator;
