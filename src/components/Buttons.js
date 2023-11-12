
import * as React from "react";
export default function Buttons(props){
    return(
        <div className="row">
            <div className="col-md-12 text-center">
                <button onClick={props.login} className="btn btn-primary">Sign in</button>
                <button onClick={props.logout} className="btn btn-danger">Logout</button>

            </div>
        </div>
    );
};