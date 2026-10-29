(function () {
    const STATEMENT_PATTERN = /\w/i;

    const TokenType = Object.freeze({
        STRING: Symbol("string"),
        STATEMENT: Symbol("statement"),
        EOF: Symbol("eof"),
    });


    class Token {
        // Token types (should codify): EOF
        constructor(type, lexeme, literal, line) {
            this.type = type;
            this.lexeme = lexeme;
            this.literal = literal;
            this.line = line;
        }

        toString() {
            return type + " " + lexeme + " " + literal;
        }
    };

    class ScannerError extends Error {
        constructor(message, line) {
            super(message);
            this.line = line;
        }
    };

    class Scanner {
        constructor(source) {
            this.source = source;
            this.tokens = [];
            this.start = 0;
            this.current = 0;
            this.line = 1;
        }

        isAtEnd() {
            return this.current >= this.source.length;
        }

        advance() {
            return this.source.charAt(this.current++);
        }

        peek() {
            return this.isAtEnd() ? "\0" : this.source.charAt(this.current);
        }

        peekFor(terminator) {
            while(this.peek() != terminator && !this.isAtEnd()) {
                if (this.peek() == '\n') this.line++;
                this.advance();
            }

            if (this.isAtEnd()) {
                throw new ScannerError("Unterminated string.", this.line);
                return;
            }

            this.advance();
        }

        string() {
            this.peekFor('"');
            // Trim the surrounding quotes.
            const value = this.source.substring(this.start + 1, this.current - 1);
            this.addToken(TokenType.STRING, value);
        }

        statement() {
            this.peekFor('.');
            const value = this.source.substring(this.start, this.current);
            this.addToken(TokenType.STATEMENT, value);
        }

        addToken(type) {
            this.addToken(type, null);
        }

        addToken(type, literal) {
            const text = this.source.substring(this.start, this.current);
            this.tokens.push(new Token(type, text, literal, this.line));
        }

        scanToken() {
            const c = this.advance();
            switch (c) {
                case " ":
                case "\t": case "\r": {
                    break;
                }

                case '\n': {
                    this.line++;
                    break;
                }

                case '"': {
                    this.string();
                    break;
                }

                default: {
                    if (STATEMENT_PATTERN.test(c)) {
                        this.statement();
                    } else {
                        throw new ScannerError("Unknown character.", this.line);
                    }
                }
            }
        }

        scanTokens() {
            while (!this.isAtEnd()) {
                this.start = this.current;
                this.scanToken();
            }

            this.tokens.push(new Token("EOF", "", null, null));
            return this.tokens;
        }
    };

    function error(line, message) {
        console.error(`[line ${line}] Error [where]: ${message}`);
    };

    function interpret(source) {
        // create a scanner
        const scanner = new Scanner(source);
        // create a list of tokens for the source
        var tokens = []
        try {
            tokens = scanner.scanTokens();
        } catch (e) {
            error(e.line, e.message);
        }

        // print every token
        tokens.forEach(token => {
            console.log(token);
        });
    };

    document.Advise = { interpret };
})();