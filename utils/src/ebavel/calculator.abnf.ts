export default `
; Calculator example.
SYNTAX = expression / expression CRLF SYNTAX
expression = term / term OWSP operator OWSP expression
term = NUMBER / Field / string / CallFunction / Atom
Field = NewField / OldField
NewField = "FORM[" FormName "].FIELD[" FieldName "]"
OldField = "[" FieldName "@" FormName "]"
FieldName = IdentifierName
FormName = IdentifierName
IdentifierName = *(StringChar / "_")
operator = arit-operator / comp-operator / logical_operator
arit-operator = "+" / "-" / "*" / "/"
comp-operator = "=" / "<" / "<=" / ">" / ">=" / "<>"
logical_operator = or-operator / and-operator
or-operator = "or" / "||"
and-operator = "and" / "&&"
string = StringWithDoubleQuote / StringWithSingleQuote
StringWithDoubleQuote = QUOTE * (ESCAPE QUOTE / ANYCHAR / StringChar / SQUOTE / AQUOTE / ESCAPE) QUOTE
StringWithSingleQuote = SQUOTE * (ESCAPE SQUOTE / ANYCHAR / StringChar / QUOTE / AQUOTE / ESCAPE) SQUOTE
StringUntilSingleQuote = StringChar / (StringChar StringUntilSingleQuote)
StringChar = %xa1-ff / ALPHA / NUMBER

CallFunction = methodName "(" OWSP *methodArgs OWSP ")"
methodName = (ALPHA / "_") *(ALPHA / DIGIT / "_")
methodArgs = methodArg * (OWSP "," OWSP methodArg)
methodArg = expression

Atom = "true" / "false" / "null"
`