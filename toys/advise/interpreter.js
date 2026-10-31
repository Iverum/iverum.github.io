(function () {
    const STATEMENT_PATTERN = /\w/i;
    const ROOM_PATTERN = /([\w\s]+) is a room.$/;
    const ITEM_PATTERN = /There is a ([\w\s]+) here.$/;

    function getName(text, pattern) {
        return pattern.exec(text)[1];
    }

    const TokenType = Object.freeze({
        STRING: Symbol("string"),
        STATEMENT: Symbol("statement"),
        EOF: Symbol("eof"),
    });

    class Token {
        constructor(type, lexeme, literal, line) {
            this.type = type;
            this.lexeme = lexeme;
            this.literal = literal;
            this.line = line;
        }

        toString() {
            return `${this.type.toString()} ${this.lexeme} ${this.literal}`;
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
            while (this.peek() != terminator && !this.isAtEnd()) {
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

            this.tokens.push(new Token(TokenType.EOF, "", null, null));
            return this.tokens;
        }
    };

    function error(line, message) {
        console.error(`[line ${line}] Error [where]: ${message}`);
    };

    function parse(tokens = []) {
        const board = { title: "", rooms: {} }; // todo: better name?
        let current = 0;
        let start = 0;
        let end = tokens.length;

        function isAtEnd() {
            return current >= tokens.length;
        }

        function advance() {
            return tokens[current++];
        }

        function previous(lookback = 1) {
            return tokens[current - lookback];
        }

        function peek() {
            return isAtEnd() ? null : tokens[current];
        }

        function previousRoom() {
            let previousRoom;
            let lookback = 1; // Lookback starts at one to skip over the token we're currently parsing.
            while (!previousRoom) {
                const previousToken = previous(++lookback);
                if (!previousToken) {
                    error(peek().line, "No room found for related statement.");
                    continue;
                }

                if (ROOM_PATTERN.test(previousToken)) {
                   previousRoom = previousToken;
                }
            }

            return previousRoom;
        }

        function getDescription(token) {
            let description = token.literal;
            let nextToken = peek();
            if (nextToken.type === TokenType.STRING) {
                nextToken = advance();
                description = nextToken.literal;
            }

            return description;
        }

        function parseRoom(token) {
            const name = getName(token.literal, ROOM_PATTERN);
            let description = getDescription(token);
            const room = { name, description };
            board.rooms[room.name] = room;
        }

        function parseItem(token) {
            const name = getName(token.literal, ITEM_PATTERN);
            const roomToken = previousRoom();
            if (!roomToken) {
                return; // Something went wrong. `previousRoom()` will report the error
            }

            const roomName = getName(roomToken.literal, ROOM_PATTERN);
            const room = board.rooms[roomName];
            const description = getDescription(token);
            const item = { name, description };
            room.items ? room.items.push(item) : room.items = [item];
        }

        function parseToken() {
            const token = advance();
            switch (true) {
                case ROOM_PATTERN.test(token.literal): {
                    parseRoom(token);
                    break;
                }

                case ITEM_PATTERN.test(token.literal): {
                    parseItem(token);
                    break;
                }

                case (token.type === TokenType.STRING): {
                    break;
                }

                case (token.type === TokenType.EOF): {
                    break;
                }

                default: {
                    error(token.line, `Unrecognized token: ${token.toString()}`);
                    break;
                }
            }
        }

        let titleToken = advance();
        if (titleToken.type != TokenType.STRING) {
            error(titleToken.line, "Advise programs must start with a string.");
        } else {
            board.title = titleToken.literal;
        }

        while (!isAtEnd()) {
            start = current;
            parseToken();
        }

        return board;
    }

    function interpret(source) {
        // create a scanner
        const scanner = new Scanner(source);
        // create a list of tokens for the source
        let tokens = []
        try {
            tokens = scanner.scanTokens();
        } catch (e) {
            error(e.line, e.message);
        }

        const board = parse(tokens);
        console.log({ board, tokens });
        return board;
    };

    document.Advise = { interpret };
})();