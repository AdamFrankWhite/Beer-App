import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    addBeer,
    toggleModal,
    addNewGroup,
} from "../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";
function Modal({ user, addBeer, toggleModal, addNewGroup }) {
    const [selectedBeerGroup, setSelectedBeerGroup] = useState("my-beers");
    const [beerGroups, getBeerGroups] = useState(user.beerGroups || []);
    const [newGroup, setNewGroup] = useState("");
    useEffect(() => {
        getBeerGroups(user.beerGroups);
    }, [user.beerGroups]);
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Select group</h2>
                <div
                    className={
                        selectedBeerGroup == "my-beers"
                            ? "highlight-folder"
                            : "folder"
                    }
                    onClick={() => setSelectedBeerGroup("my-beers")}
                >
                    <FontAwesomeIcon icon={faFolder} />
                    My Beers
                </div>
                <div className="row">
                    <h3>Add group</h3>
                    <input
                        type="text"
                        onChange={(e) => setNewGroup(e.target.value)}
                    />
                    <button
                        onClick={() =>
                            addNewGroup(user.userData.username, newGroup)
                        }
                    >
                        Add
                    </button>
                </div>
                {/* Beer groups */}
                {beerGroups.map((beerGroup) => {
                    return (
                        <div
                            className={
                                selectedBeerGroup == beerGroup
                                    ? "highlight-folder pl-1"
                                    : "folder pl-1"
                            }
                            onClick={() => setSelectedBeerGroup(beerGroup)}
                        >
                            <FontAwesomeIcon icon={faFolder} />
                            {beerGroup}
                        </div>
                    );
                })}

                <p
                    onClick={() => {
                        addBeer({
                            username: user.userData.username,
                            // brewery: props.brewery,
                            beerData: user.addBeerData,
                            beerGroup: selectedBeerGroup,
                        });
                        toggleModal(false);
                    }}
                    className="add-fave-btn"
                >
                    Add to bookmarks
                </p>
                <p
                    onClick={() => {
                        toggleModal(false);
                    }}
                    className="cancel-modal-btn"
                >
                    Cancel
                </p>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    addBeer,
    toggleModal,
    addNewGroup,
};
export default connect(mapStateToProps, mapActionsToProps)(Modal);