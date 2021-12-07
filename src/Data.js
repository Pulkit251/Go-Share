import React, {useEffect, useState} from 'react'
import "./css/data.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { db } from './firebase';
function Data() {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        db.collection("myspace").onSnapshot(snapshot=>{
            setFiles(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        })
    }, [])

    function formatBytes(bytes, decimals = 2){
        if(bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (  

        <div className="data">
            <div className="data-header">
                <div className="data-header-left">
                    <p>My Locker</p>
                    <ArrowDropDownIcon/>
                </div>                
            </div>

            <div className="data-content">
                <div className="data-grid">
                    {
                        files.map((file)=>{
                            return <div className="data-file">
                                <InsertDriveFileIcon/>
                                <p>{file.data.filename}</p>
                            </div>
                        })
                    }
                    {/* <div className="data-file">
                        <InsertDriveFileIcon/>
                        <p>FileName</p>
                    </div> */}
                    
                </div>

                <div className="data-list">
                    <div className="detailsRow">
                        <p><b>Name <ArrowDownwardIcon/></b></p>
                        <p><b>Storage Location</b></p>
                        <p><b>Date Modified</b></p>
                        <p><b>File Size</b></p>                           
                    </div>
                    {
                        files.map((file)=>{
                            return  <div className="detailsRow">
                                <p>
                                    <a href={file.data.fileURL} target="blank">
                                    <InsertDriveFileIcon/>{file.data.filename}</a>
                                </p>
                                <p>Locker</p>
                                <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                                <p>{ formatBytes(file.data.size)}</p>                           
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Data
