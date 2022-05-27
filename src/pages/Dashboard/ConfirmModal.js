import React from 'react';

const ConfirmModal = ({ children }) => {
    return (
        <div>
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Are you sure?</h3>
                    <div className="modal-action flex justify-center">
                        <label onClick={children} htmlFor="confirm-modal" className="btn btn-error">Yes</label>
                        <label htmlFor="confirm-modal" className="btn">close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;