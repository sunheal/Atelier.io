import React, {useState, useEffect} from "react"

const App = ()=> {
    const input = ['Kyle Kang ', 'Nicole Li ', 'Nicole Qi ', 'Alan Li'];
    const [names, setName] = useState(input);
    const [open, changeopen] = useState(false);
    const [status, changestatus] = useState('showing');
    const showName = ()=>{
        changeopen(!open);
        if(!open) {
            console.log('sholdnot show');
            setName(['','','','']);
        }else {
            console.log('should show');
            setName(input);
        }
    }
    
    useEffect(
          ()=>  {
              if(names[0]==='') {
                  changestatus('hidden');
              }else {
                  changestatus('showing');
              }
          }, names
        )
    
    return (
        <div>
        <h2>Hello World</h2>
        <button onClick={showName}> Show it</button>
        <h2> {status} </h2>
        <div> </div>
         {names.map((name,index)=> {
             return (
                 <p key={index}> {name} </p>
             )
         })} 
        </div>
    )
}

export default App;