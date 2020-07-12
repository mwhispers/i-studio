function writeScalar(state, string, level, isKey){
    state.dump = (function(){
        if(string.length === 0){
            return "''";
        }
        if(!state.noCompatMode && 
            DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1){
          return "'" + string + "'";
        }

        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = isKey || (state.flowLevel > -1 && level >= state.flowLevel);

        function testAmbiguity(string){
            return testImplicitResolving(state, string);
        }

        switch(chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)){
    
        }
    })();
}

function testImplicitResolving(state, str){
    var index, length, type;

    for(index = 0, length = state.implicitTypes.length; index < length; index++){
        type = state.implicitTypes[index];

        if(type.resolve(str)){
            return true;
        }
    }

    return false;
}

function generateNextLine(state, level){
    return '\n' + repeat(' ', state.index * level);
}

function repeat(str, count){
    var result = '', cycle;

    for(cycle = 0; cycle < count; cycle++){
        result += str;
    }

    return result;
}

function indentString(string, spaces){
    var ind = repeat(' ', spaces),
        position = 0,
        next = -1,
        result = '',
        line,
        length = string.length;
    while(position < length){
        next = string.indexOf('\n', position);
        if(next === -1){
            line = string.slice(position);
            position = length;
        } else {
            line = string.slice(position, next + 1);
            position = next + 1;
        }

        if(line.length && line !== '\n'){
            result += ind;
        }

        result += line;
    }

    return result;
}

function encodeHex(character){
    var string, handle, length;

    string = character.toString(16).toUpperCase();

    if(character <= 0xFF){
        handle = 'x';
        length = 2;
    } else if(character <= 0xFFFF){
        handle = 'u';
        length = 4;
    } else if (character <= 0xFFFFFFFF){
        handle = 'U';
        length = 8;
    } else {
        throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
    }

    return '\\' + handle + repeat('0', length - string.length) + string;
}

function compileStyleMap(schema, map){
    var result, keys, index, length, tag, style, type;

    if(map === null) return {};
    
    result = {};

    keys = Object.keys(map);

    for(index = 0, length = keys.length; index < length; index++){
        tag = keys[index];
        style = String(map(tag));

        if(tag.slice(0,2) === '!!'){
            tag = 'tag:yaml.org,2002:' + tag.slice(2);
        }

        type = schema.compiledTypeMap['fallback'][tag];

    }
}

function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType){
    var i;
    var char, prev_char;
    var hasLineBreak = false;
    var hasFoldableLine = false;
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBraak = -1;
    var plain = is
}

var str = "abc\ndef\n";
str = indentString(str,4);
console.log(str)