import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest, userRequest } from "../../requestMethod";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Modal from "../../components/popup/modal";


export default function UserList() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_id, setId] = useState(0);
  const dispatch = useDispatch();
  const ASSET = process.env.REACT_APP_ASSETS;


  const handleCancelEvent = () => {
    setId(0);
    setIsModalOpen(false)
  }
  const handleDeleteEvent = () => {
    deleteUser(_id);
    setIsModalOpen(false);
  }

  const handleDelete = (id) => {
      setId(id);
      setIsModalOpen(true);
       
  };

  const deleteUser = async (id) => {    try {
   const currentUser = data.find(t => t._id === id);
   if(currentUser.isAdmin) return;
    const res = await userRequest.delete('/users/'+ id);
    if(res){
       const newRes = data.filter(t => t._id !== id);
       setData(newRes);
    }
    

  } catch (err) { }
}

  const getUserDetails = async () => {    try {
      const res = await userRequest.get('/users');
      setData(res.data);

    } catch (err) { }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={ASSET+"no-img.jpg"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "createdAt", headerName: "Joined", width: 200 },
    { field: "isAdmin", headerName: "Is Admin", width: 200 ,
     renderCell: (params) => {
      return (
          <div>{params.row.isAdmin ? 'Yes' : 'No'}</div>
      );
    },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="userList">
          <DataGrid
            rows={data}
            getRowId={row => row._id}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
        </div>
        {isModalOpen ?  <Modal handleCancelEvent={handleCancelEvent} handleDeleteEvent={handleDeleteEvent} /> : ''}
      </div>
    </>

  );
}
