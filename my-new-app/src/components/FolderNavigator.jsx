import React from 'react'

const FolderCard = ({baseAddress, name, address, setPath}) => {

  const handleClick= () => {
    let newPath = address.replace(baseAddress, "");

    console.log("hi " +  newPath);
    setPath(newPath);
  }
  
  return (
    <div>
      <h4 onClick={handleClick}>{ name }</h4>
    </div>
  )
}

const FolderNavigator = ({baseAddress, ancestors, setPath}) => {
  console.log(ancestors);

  return (
    <div className='navigator'>
      {ancestors.map(ele => (
        <FolderCard baseAddress={baseAddress} name={ele[1]} address={ele[0]} setPath={setPath}/>
      ))}
    </div>
  )
}

export default FolderNavigator
