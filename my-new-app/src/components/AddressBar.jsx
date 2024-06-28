import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';

const FolderCard = ({baseAddress, name, address, setPath}) => {

  const handleClick= () => {
    let newPath = address.replace(baseAddress, "");

    console.log("hi " +  newPath);
    setPath(newPath);
  }
  
  return (
    <div>
      <div className='address-bar-item' onClick={handleClick}>{ name }</div>
    </div>
  )
}

const AddressBar = ({baseAddress, ancestors, setPath}) => {
  console.log(ancestors);

  return (
    <div className='navigator'>
      <ComputerOutlinedIcon sx={{color: "#a9a9a9",  cursor:"default"}}/>
      <NavigateNextIcon  sx={{color : "#a7a7a7", cursor:"default"}} fontSize="small" />

      {ancestors.map(ele => (
        <>
        <FolderCard baseAddress={baseAddress} name={ele[1]} address={ele[0]} setPath={setPath}/>
        <NavigateNextIcon sx={{color : "#a7a7a7", cursor:"default"}} fontSize="small" />
        </>
      ))}
    </div>
  )
}

export default AddressBar
