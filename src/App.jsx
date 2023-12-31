import { useCallback, useEffect, useState, useRef } from "react";

function App() {
    const [length, setlength] = useState(10);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef=useRef(null)

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }

        setPassword(pass);
    }, [length, numberAllowed, charAllowed, setPassword])



    const copyPasswordToClipboard = useCallback(() => {
      // passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 999);
      window.navigator.clipboard.writeText(password)
    }, [password])



    useEffect(() => {
        passwordGenerator()
    }, [length, numberAllowed, charAllowed, passwordGenerator])



    return (
        <>
        
            <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-white bg-sky-500/100">
                <h1 className="text-white text-center">Password Generator</h1>
                <div className="flex shadow rounded-lg  ">
                    <input
                        type="text"
                        value={password}
                        className="outline-none w-full py-1 px-3  rounded-lg text-slate-950"
                        placeholder="Password"
                        readOnly
                        ref={passwordRef}
                    />

                    <button 
                    className="mx-1 bg-blue-950 px-2 py-2 rounded-md"
                    onClick={copyPasswordToClipboard}
                    >
                        Copy
                    </button>
                </div>

                <div className="flex text-sm gap-x-2">
                    <div  className="flex items-center gap-x-1">
                        <input
                            type="range"
                            min={6}
                            max={25}
                            value={length}
                            className="cursor-pointer"
                            id="range"
                            onChange={(e) => {
                                setlength(e.target.value);
                            }}
                        />
                        <label htmlFor="range">Length: {length}</label>

                        <input
                            type="checkbox"
                            defaultChecked={numberAllowed}
                            id="numberInput"
                            onChange={() => {
                                setNumberAllowed((prev) => !prev);
                            }}
                        />
                        <label htmlFor="numberInput">Number</label>

                        <input
                            type="checkbox"
                            id="character"
                            defaultChecked={charAllowed}
                            onChange={() => {
                                setCharAllowed((prev) => !prev);
                            }}
                        />
                        <label htmlFor="character">Character</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
