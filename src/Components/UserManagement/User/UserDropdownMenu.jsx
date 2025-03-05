import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { setGlobalActionsId } from "../../../Redux/InstaEnrollSlice";
import { useDispatch } from "react-redux";

const DropdownMenu = ({
  index,
  item,
  openDropdowns,
  toggleDropdown,
  closeDropdown,
  actions,
  onEdit,
  onView,
  onAuth,
  onDelete,
  userId,
}) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isDropdownAbove, setIsDropdownAbove] = useState(false);

  const isEditable =
    item.process_status === 1 ||
    (item.process_status === 3 && !userId.includes(item.created_userid));

  const isAuthButtonEnabled =
    (item.process_status === 2 && !userId.includes(item.created_userid)) ||
    (item.process_status === 5 && !userId.includes(item.created_userid_edited));

  const isDeletable =
    item.process_status === 1 ||
    item.process_status === 3 ||
    (item.process_status === 4 && !userId.includes(item.auth_userid));

  const calculateDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      setIsDropdownAbove(spaceBelow < 100 && spaceAbove > spaceBelow);
    }
  };

  useEffect(() => {
    if (openDropdowns[index]) {
      requestAnimationFrame(() => calculateDropdownPosition());
    }
  }, [openDropdowns, index]);

  const wrapperVariants = {
    open: {
      opacity: 1,
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      scaleY: 0,
      transition: { when: "afterChildren" },
    },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };

  return (
    <div className="relative inline-block text-left font-roboto z-50">
      <button
        onClick={() => toggleDropdown(index, item)}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <BsThreeDotsVertical className="text-sm sm:text-base md:text-lg lg:text-xl" />
      </button>

      <AnimatePresence>
        {openDropdowns[index] && (
          <motion.div
            ref={dropdownRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={wrapperVariants}
            className={`absolute z-20 bg-white text-black w-48 sm:w-40 md:w-44 lg:w-36  border border-gray-200 rounded shadow-lg ${
              isDropdownAbove
                ? "bottom-full mt-2 sm:mt-1 md:mt-2 lg:mt-2 right-20 sm:right-20 md:right-20 lg:right-20"
                : "top-full mt-2 sm:mt-1 md:mt-2 lg:mt-2 right-20 sm:right-20 md:right-20 lg:right-20"
            }`}
          >
            <div className="flex justify-end p-0">
              <motion.button
                onClick={() => closeDropdown(index)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                <FaTimes className="text-sm sm:text-base md:text-lg lg:text-xl" />
              </motion.button>
            </div>
            <div className="flex flex-col ">
              {actions
                ?.filter(({ action_name }) => action_name !== "Add")
                ?.map(({ action_name, action_id }, idx) => {
                  const isDisabled =
                    (action_name === "Edit" && !isEditable) ||
                    (action_name === "Authorise" && !isAuthButtonEnabled) ||
                    (action_name === "Delete" && !isDeletable);

                  const onClickHandler = () => {
                    if (!isDisabled) {
                      console.log(action_id);
                      dispatch(setGlobalActionsId(action_id));
                      if (action_name === "Edit") onEdit(item, index);
                      if (action_name === "Authorise")
                        onAuth(item, index, action_id);
                      if (action_name === "Delete")
                        onDelete(item, index, action_id);
                      if (action_name === "View") onView(item, index);
                    }
                  };

                  return (
                    <motion.button
                      key={idx}
                      onClick={onClickHandler}
                      variants={itemVariants}
                      className={`flex items-center text-left py-[4px] px-4 transition-colors ${
                        isDisabled
                          ? "cursor-not-allowed text-gray-400 hover:bg-white"
                          : "text-black hover:bg-gray-200"
                      }`}
                      disabled={isDisabled}
                    >
                      {action_name === "Edit" && (
                        <AiOutlineEdit className="mr-2 text-sm " />
                      )}
                      {action_name === "Delete" && (
                        <FiTrash className="mr-2 text-sm " />
                      )}
                      {action_name === "View" && (
                        <FiEye className="mr-2 text-sm " />
                      )}
                      {action_name === "Authorise" && (
                        <MdCheckCircle className="mr-2 text-sm " />
                      )}
                      {action_name}
                    </motion.button>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
