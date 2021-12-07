
import React,{useState} from "react";
import "./css/sidebar.css"
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import DevicesIcon from '@mui/icons-material/Devices';
import HistoryIcon from '@mui/icons-material/History';
// import StarRateIcon from '@mui/icons-material/StarRate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Star } from '@mui/icons-material';
import BackupIcon from '@mui/icons-material/Backup';
// import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Modal } from "@mui/material";
import { db, storage } from "./firebase";
import firebase from 'firebase';
import 'firebase/firestore';
function Sidebar() {   
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file,setFile] = useState(null);
    const handleClose=()=>{
        setOpen(true);
    }
    const handleOpen=()=>{
        setOpen(true);
    }
    const handleChange=(e)=>{
        if(e.target.files[0]){
            setFile(e.target.files[0]);
        }
    }
    const handleUpload=(event)=>{
        event.preventDefault();
        setUploading(true);

        storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
            storage.ref("files").child(file.name).getDownloadURL().then(url=>{
                db.collection("myspace").add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    filename:file.name,
                    fileURL:url,
                    size:snapshot._delegate.bytesTransferred
                });

                setUploading(false);
                setFile(null);
                setOpen(false);
            })
        })
    }
    return (     
        <>
        <Modal open={open} onClose={handleClose}>
            <div className="modal-pop">
                <form>
                    <div className="modalHeading">
                        <h3>Select files to Upload</h3>
                    </div>

                    <div className="modalBody">
                        {
                            uploading ? (<p className="uploading">Uploading...</p>) : (
                            <>
                            <input type = "file" onChange={handleChange}/>
                            <input type="submit" className="post-submit" onClick={handleUpload}/>
                            </>)
                        }
                        
                    </div>
                </form>
            </div>
        </Modal>
        <div className="sidebar">
            <div className="sidebar-button">
                <button onClick={handleOpen}>
                <img src="https://img.icons8.com/windows/32/000000/add.png" alt=""/>
                    <span>Build</span>
                </button>
            </div>

            <div className="Sidebar-options">
                <div className="Sidebar_opt sidebar-opt-active">
                    <FolderSharedIcon/>
                    <span>My Locker</span>
                </div>
                <div className="Sidebar_opt">
                    <DevicesIcon/>
                    <span>Computer</span>
                </div>
                <div className="Sidebar_opt">
                    <HistoryIcon/>
                    <span>Latest</span>
                </div>
                <div className="Sidebar_opt">
                    <Star/>
                    <span>Star Marked</span>
                </div>
                <div className="Sidebar_opt">
                    <DeleteOutlineIcon/>
                    <span>Bin</span>
                </div>
            </div>

            <hr/>
            <div className="Sidebar_opt">
                <BackupIcon/>
                <span>Backup</span>
            </div>

            <div className="progress_bar">
                <progress value="20" max="100"/>
                <span>2Gb of 20Gb Used</span>
            </div>
        </div>
        </>
    )
}

export default Sidebar
