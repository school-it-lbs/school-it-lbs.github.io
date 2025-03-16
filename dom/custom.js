function registerCodeMirror(){
    document.querySelectorAll("section").forEach((section) => {
        const textarea = section.querySelectorAll("textarea");
        const textAreaCode = textarea[0];        
        
        const codemirror = CodeMirror.fromTextArea(textAreaCode, {
            mode: "javascript",
            theme: "monokai",
            lineNumbers: true,
            matchBrackets: true,
            indentUnit: 2,
            tabSize: 2 
        });
        
        section.querySelector("button").addEventListener("click", () => {
            const code = codemirror.getValue();
        
            eval(code);            
        });        
    });
}

registerCodeMirror();
