import React from "react";
import { Modal, ModalContent, ModalFooter } from "../Modal";
import { Button } from "../Button";
import { useMutation, useQueryClient } from "react-query";
import { mainAxios } from "../../utils";
import { useNavigate } from "react-router-dom";

interface DeletePostModalProps {
 onClose: () => void;
}

export function DeletePostModal({ onClose }: DeletePostModalProps) {
 const navigate = useNavigate();
 const queryClient = useQueryClient();
 const path = window.location.pathname.replace("/edit", "");

 const deleteMutation = useMutation({
  mutationFn: (path: string) => {
   return mainAxios.delete(path);
  },
 });

 const deletePost = () => {
  deleteMutation.mutate(path, {
   onSuccess: () => {
    queryClient.refetchQueries("posts");
    navigate("/own-posts");
   },
   onError: error => {
    console.log(error);
   },
  });
 };
 return (
  <Modal title="Are you sure?" onClickOutside={onClose}>
   <ModalContent>
    <div className="modal__confirm-text">
     Do you really want to delete this post?
     <br />
     This procces can not be undone!
    </div>
   </ModalContent>
   <ModalFooter>
    <Button type="secondary" onClick={onClose}>
     Close
    </Button>
    <Button
     type="primary"
     onClick={deletePost}
     disabled={deleteMutation.isLoading}
    >
     Delete
    </Button>
   </ModalFooter>
  </Modal>
 );
}
