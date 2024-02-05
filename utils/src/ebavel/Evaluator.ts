import { Functions } from "./Functions"
import { Compiler, Token } from '@ebavel/bnf'
import { IBaseModel } from "./utils"
import { IEvaluatorOptions, IEndpoint } from "./Functions"
import calculatorAbnf from "./calculator.abnf"

export const Evaluator = class extends Functions {
  endpoint: IEndpoint | null = null
  form: string | null = null
  model: IBaseModel = {}
  compiler: Compiler
  _result: {
    formula: string
    value: any
    error?: any
  } = {
      formula: '',
      value: null,
    }

  constructor(options: IEvaluatorOptions) {
    super();
    this.endpoint = options.endpoint
    this.model = options.model || {}
    this.form = options.form

    //Load bnf file, this can be done inline//
    this.compiler = new Compiler();
    this.compiler.AddLanguage(calculatorAbnf, "calc");

    this.setRules()

    return new Proxy(this, {
      get: function (self, prop: string) {
        if (prop in self) return self[prop]; // normal case
        prop = `fn` + prop.slice(2).charAt(0).toUpperCase() + (prop.slice(3) || '').toLowerCase();
        if (prop in self) return self[prop];
        console.error(`Property not found ${prop}`)
      }
    });
  }

  async cal(formula: string) {
    try {
      await this.compiler.AsyncParseScript(formula.trim());
    } catch (error) {
      console.log(`FN Cal error: ${error}`)
    }

    return this._result.value
  }

  setRules() {
    const self = this
    this.compiler.SetRuleEvents({
      async SYNTAX(token: Token) {
        try {
          let result = await self.eval(token.value)
          result = Number.isNaN(result) ? undefined : result
          self._result = { formula: token.value, value: result }
        } catch (error: any) {
          self._result = { formula: token.value, error: error.toString(), value: null }
        }
      },
      Field(token: Token) {
        token.SetReplaceValue(`self.getValueModel("${token.Child('FieldName').value}")`)
      },
      CallFunction(token: Token) {
        let methodName = token.Child('methodName').value
        methodName = methodName.charAt(0).toUpperCase() + methodName.slice(1).toLowerCase()
        const methodArgs = token.Child('methodArgs')?.value

        token.SetReplaceValue(`yield self.fn${methodName}(${methodArgs ? methodArgs : ''})`)
      },
      logical_operator(token: Token) {
        if (token.value == 'and') {
          token.SetReplaceValue('&&')
        }
        if (token.value == 'or') {
          token.SetReplaceValue('||')
        }
      }
    });
  }

  async eval(formula: string) {
    const self = this

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

    return myWrapperFunction()`

    const getAsyncFunction = async function () { }.constructor('self', code)
    return getAsyncFunction(this)
  }

  getValueModel(prop: string) {
    return this.model[prop]
  }
}