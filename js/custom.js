function registerCodeMirror(){
    document.querySelectorAll("section").forEach((section) => {
        const textarea = section.querySelectorAll("textarea");
        const textAreaCode = textarea[0];        
        const textAreaOutput = textarea[1];
        textAreaOutput.value = "";
        
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
    
            //alternative outpur method
            function output(x){
                textAreaOutput.value = textAreaOutput.value + x + '\r\n';
            }
    
            // //override console.log
            // const console = {
            //     log: (x) => {                    
            //         output(x);
            //     }
            // }
                    
            eval(code);            
        });        
    });
}

registerCodeMirror();
