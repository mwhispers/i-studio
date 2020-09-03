<template>
    <div class="code-mirror">
        <textarea ref="textarea" id="aaaaaa"></textarea>
    </div>
</template>
<script>
import CodeMirror from 'codemirror';
// theme
import 'codemirror/theme/cobalt.css';
// mode 
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/javascript/javascript.js';
export default {
    props: {
        value: String,
        language: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            code: '',
            mode: 'javascript',
            coder: null,
            option: {
                theme: 'cobalt',
                lineNumbers: true,
                tabSize: 2,
                line: true,
                mode: 'text/javascript',
                readOnly: true
            },
            modes: [
                {
                    value: 'css',
                    label: 'CSS'
                },
                {
                    value: 'javascript',
                    label: 'Javascript'
                }
            ]
        }
    },
    methods: {
        _getLanguage(language) {
            return this.modes.find((mode) => {
                let currentLanguage = language.toLowerCase();
                let currentLabel = mode.label.toLowerCase();
                let currentValue = mode.label.toLowerCase();

                return currentValue === currentLanguage || currentValue === currentLanguage;
            })
        },
        changeMode(value) {
            this.coder.setOption('mode', `text/${value}`);

        }
    },
    created() {
        this.$nextTick(()=> {
            let textarea = this.$refs['textarea'];
            this.coder = CodeMirror.fromTextArea(textarea, this.option);
            this.coder.setValue('Hello World!')
            // 数据双向绑定
            this.coder.on('change', (coder) => {
                this.code = coder.getValue();
                this.$emit('input', this.code);
            })

            if(this.language) {
                let modeObj = this._getLanguage(this.language);

                if(modeObj) {
                    this.mode = modeObj.label
                }
            }
        })
    }
}
</script>
<style lang="less" scoped>

</style>