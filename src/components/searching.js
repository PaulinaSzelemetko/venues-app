import React from 'react';
import { useState } from 'react';

const Searching = (props)  => {
    const [value, setValue] = useState('');

    const searchInputHandler = (event) => {
        setValue(event.target.value);
   }

   const handleSubmit = (event) => {
    event.preventDefault();
       props.onSubmit(value)
   }

   return (
     <div className="Searching">
       <form>
        <input type ='text' onChange={searchInputHandler} value={value} placeholder='search for venues...' />
        <button onClick={handleSubmit}>Search</button>
      </form>
    </div>
   );
}

  export default Searching;

