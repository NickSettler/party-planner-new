import React from "react";
import { EMSIJob } from "../../../helpers/emsiopen/types";
import {
  EventModel,
  PartiesToDirectusUsersModel,
} from "../../../helpers/api/model";

export type MemberModalProps = {
  events: Array<EventModel>;
  isOpen: boolean;
  memberModalId: string | number;
  setMemberModal: (id: string | number) => void;
  memberUpdateRequestSuccess: boolean;
  runMemberUpdateRequest: (memberInfo: PartiesToDirectusUsersModel) => void;
  setMemberUpdateRequestCompleted: (completed: boolean) => void;
};

export type MemberModalHook = {
  isOpen: boolean;
  useRolesAutocomplete: boolean;
  handleModalClose: () => void;
  handleRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  jobTitles: Array<EMSIJob>;
  jobsLoading: boolean;
  currentMember?: PartiesToDirectusUsersModel;
  role: string;
  came: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleRoleSelect: (v: EMSIJob | string | null) => void;
};
