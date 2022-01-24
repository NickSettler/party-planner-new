import { MemberModalHook, MemberModalProps } from "./MemberModal.types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import EMSIOpenApi from "../../../helpers/emsiopen";
import { debounce } from "lodash";
import { EMSIJob } from "../../../helpers/emsiopen/types";
import { useParams } from "react-router-dom";
import {
  EventModel,
  PartiesToDirectusUsersModel,
} from "../../../helpers/api/model";
import { useFormik } from "formik";
import { getRemoteConfig, getValue } from "firebase/remote-config";
import FirebaseHelper from "../../../helpers/firebase";
import { FirebaseApp } from "firebase/app";

const useMemberModal = ({
  events,
  isOpen: isOpenProp,
  setMemberModal,
  memberModalId,
  runMemberUpdateRequest,
  memberUpdateRequestSuccess,
  setMemberUpdateRequestCompleted,
}: MemberModalProps): MemberModalHook => {
  const params = useParams();

  const firebaseAppRef = useRef<FirebaseApp>(FirebaseHelper.getInstance().app);

  const [useRolesAutocomplete] = useState<boolean>(
    getValue(
      getRemoteConfig(firebaseAppRef.current),
      "use_roles_autocomplete"
    ).asBoolean()
  );

  const [currentEvent, setCurrentEvent] = useState<EventModel>(
    events.find((event: EventModel) => ~~event.id === ~~params.id!)!
  );
  const [currentMember, setCurrentMember] =
    useState<PartiesToDirectusUsersModel>();

  const [initialRole, setInitialRole] = useState<string>(currentMember?.role!);
  const [initialCame, setInitialCame] = useState<boolean>(currentMember?.came!);
  const [, setHasChanges] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(isOpenProp);
  const [jobTitles, setJobTitles] = useState<EMSIJob[]>([]);
  const [jobsLoading, setJobsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      role: initialRole,
      came: initialCame,
    },
    onSubmit: (values) => {
      if (currentMember)
        runMemberUpdateRequest({
          ...currentMember,
          role: values.role,
          came: values.came,
        });
    },
  });

  const { handleSubmit, handleChange, values, setFieldValue } = formik;

  useEffect(() => {
    setCurrentEvent(events.find((event) => ~~event.id === ~~params.id!)!);
  }, [events, params.id]);

  useEffect(() => {
    if (currentEvent && memberModalId) {
      setCurrentMember(
        currentEvent.members.find(
          (rel: PartiesToDirectusUsersModel) =>
            rel.directus_users_id.id === memberModalId
        )!
      );
    }
  }, [currentEvent, memberModalId]);

  useEffect(() => {
    if (currentMember) {
      setInitialRole(currentMember.role);
      setInitialCame(currentMember.came);

      setFieldValue("role", currentMember.role || "");
      setFieldValue("came", currentMember.came || false);

      setMemberUpdateRequestCompleted(false);
    }
  }, [currentMember, setFieldValue, setMemberUpdateRequestCompleted]);

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const handleModalClose = useCallback(() => {
    setMemberModal("");
    setJobTitles([]);

    setFieldValue("role", initialRole || "");
    setFieldValue("came", initialCame || false);
  }, [initialCame, initialRole, setFieldValue, setMemberModal]);

  const handleRoleChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target) return;
    if (typeof e.target.value !== "string") return;

    setFieldValue("role", e.target.value);

    if (useRolesAutocomplete) {
      setJobsLoading(true);

      EMSIOpenApi.getInstance()
        .then((emsi) => emsi.findTitles(e.target.value))
        .then((titles) => {
          if (titles?.data) {
            setJobTitles(
              titles.data.map((title: EMSIJob) => {
                title.label = title.name;
                return title;
              })
            );
            setJobsLoading(false);
          }
        });
    }
  };

  const handleRoleChange = useMemo(
    () => debounce(handleRoleChangeFunc, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRoleSelect = useCallback(
    (v: EMSIJob | string | null) => {
      if (v) {
        setFieldValue("role", typeof v === "string" ? v : v.name);
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    if (memberUpdateRequestSuccess) handleModalClose();
  }, [handleModalClose, memberUpdateRequestSuccess]);

  useEffect(() => {
    if (values.came !== initialCame || values.role !== initialRole)
      setHasChanges(true);
    else setHasChanges(false);
  }, [initialCame, initialRole, values]);

  return {
    isOpen,
    useRolesAutocomplete,
    handleModalClose,
    handleRoleChange,
    jobTitles,
    jobsLoading,
    currentMember,
    came: values.came,
    role: values.role,
    handleChange,
    handleSubmit,
    handleRoleSelect,
  };
};

export default useMemberModal;
