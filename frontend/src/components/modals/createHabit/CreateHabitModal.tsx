import type { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import CreateHabit from "./CreateHabit";

interface CreateHabitModalProps {
    show: Boolean;
    onHide: Function;
    refresh: Function;
}

const CreateHabitModal: FunctionComponent<CreateHabitModalProps> = ({ show, onHide, refresh }) => {
    return (
        <>
            <Modal show={show} onHide={() => onHide()} aria-labelledby="contained-modal-title-vcenter" centered contentClassName="create-habit--modal" >
                <Modal.Header closeButton >
                    <Modal.Title>New Habit</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding: "2rem"}} >
                    <CreateHabit onHide={onHide} refresh={refresh} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateHabitModal;