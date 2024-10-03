import { useState, useEffect } from "react";
import { getPublisher, deletePublisher, createPublisher, updatePublisher } from "../../API/publisher";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function Publisher() {
  const [publishers, setPublishers] = useState([]);
  const [reload, setReload] = useState(true);
  const [newPublisher, setNewPublisher] = useState({
    name: "", 
    establishmentYear: "",
    address: "",
  });
  const [updatePublisherData, setUpdatePublisherData] = useState({
    name: "", 
    establishmentYear: "",
    address: "",
    id: null
  });
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (reload) {
      getPublisher().then((data) => {
        setPublishers(data);
        setReload(false);
      }).catch((error) => {
        console.error("Error fetching publishers:", error);
      });
    }
  }, [reload]);

  const handleDelete = (id) => {
    deletePublisher(id).then(() => {
      setReload(true);
    }).catch((error) => {
      console.error("Error deleting publisher:", error);
    });
  };

  const handleUpdate = () => {
    if (updatePublisherData.id) {
      updatePublisher(updatePublisherData).then(() => {
        setReload(true);
      }).catch((error) => {
        console.error("Error updating publisher:", error);
      });
      setUpdatePublisherData({
        name: "", 
        establishmentYear: "",
        address: "",
        id: null
      });
    }
  };

  const handleNewPublisherChange = (event) => {
    setNewPublisher({
      ...newPublisher,
      [event.target.name]: event.target.value
    });
  };

  const handleCreate = () => {
    createPublisher(newPublisher).then(() => {
      setReload(true);
    }).catch((error) => {
      console.error("Error creating publisher:", error);
    });
    setNewPublisher({
      name: "", 
      establishmentYear: "",
      address: "",
    });
  };

  const handleUpdateBtn = (pub) => {
    setUpdatePublisherData({
      name: pub.name,
      establishmentYear: pub.establishmentYear,
      address: pub.address,
      id: pub.id
    });
  };

  const handleUpdateChange = (event) => {
    setUpdatePublisherData({
      ...updatePublisherData,
      [event.target.name]: event.target.value
    });
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchBtn = () => {
  };

  return (
    <div>
      <h1>Publisher Management</h1>
      <br />
      <h3>Add New Publisher</h3>
      <div className="publisher-new">
        <input 
          type="text" 
          placeholder="Publisher Name" 
          name="name"
          value={newPublisher.name}
          onChange={handleNewPublisherChange} />
        <input 
          type="text" 
          placeholder="Establishment Year" 
          name="establishmentYear"
          value={newPublisher.establishmentYear}
          onChange={handleNewPublisherChange} />
        <input 
          type="text" 
          placeholder="Address" 
          name="address"
          value={newPublisher.address}
          onChange={handleNewPublisherChange} />
        <button onClick={handleCreate}>Add</button>
      </div>

      <div className="publisher-update">
        <h3>Update Publisher</h3>
        <input 
          type="text" 
          placeholder="Publisher Name" 
          name="name"
          value={updatePublisherData.name}
          onChange={handleUpdateChange} />
        <input 
          type="text" 
          placeholder="Establishment Year" 
          name="establishmentYear"
          value={updatePublisherData.establishmentYear}
          onChange={handleUpdateChange} />
        <input 
          type="text" 
          placeholder="Address" 
          name="address"
          value={updatePublisherData.address}
          onChange={handleUpdateChange} />
        <button onClick={handleUpdate}>Update</button>
      </div>

      <div>
        <br />
        <h3>Publishers</h3>
        <input 
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={handleSearchChange} />
        <button onClick={handleSearchBtn}>Search</button>
        <br />
        {publishers.map((pub) => (
          <div key={pub.id}>
            {pub.name} - {pub.establishmentYear} - {pub.address}
            <span onClick={() => handleDelete(pub.id)}>
              <DeleteIcon />
            </span>
            <span onClick={() => handleUpdateBtn(pub)}>
              <UpdateIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Publisher;