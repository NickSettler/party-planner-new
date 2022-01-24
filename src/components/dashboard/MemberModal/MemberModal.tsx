import React, { forwardRef } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { MemberModalProps } from "./MemberModal.types";
import useMemberModal from "./useMemberModal";
import {
  memberModalIdSelector,
  memberUpdateRequestSuccessSelector,
  runMemberUpdateRequest,
  setMemberModalId,
  setMemberUpdateRequestCompleted,
} from "../../../modules/members";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import { MemberGlassDialog } from "./styled/MemberModal.styled";
import { eventsSelector } from "../../../modules/events";
import { EMSIJob } from "../../../helpers/emsiopen/types";
import { PartiesToDirectusUsersModel } from "../../../helpers/api/model";
import Api from "../../../helpers/api";

const ModalTransition = forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => {
    return <Grow ref={ref} {...props} />;
  }
);

const MemberModal = (props: MemberModalProps): JSX.Element => {
  const {
    isOpen,
    useRolesAutocomplete,
    handleModalClose,
    handleRoleChange,
    jobTitles,
    jobsLoading,
    currentMember,
    came,
    role,
    handleChange,
    handleSubmit,
    handleRoleSelect,
  } = useMemberModal(props);

  return (
    <MemberGlassDialog
      open={isOpen}
      onClose={handleModalClose}
      closeAfterTransition
      TransitionComponent={ModalTransition}
      fullWidth
      maxWidth={"xs"}
      keepMounted={false}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Member Details</DialogTitle>
        <DialogContent>
          <Stack direction={"column"} gap={2}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Avatar
                src={`${Api.url}/assets/${currentMember?.directus_users_id.avatar}?key=64-64`}
              />
              <Stack direction={"column"}>
                <Typography variant={"subtitle1"}>
                  {currentMember?.directus_users_id.first_name}{" "}
                  {currentMember?.directus_users_id.last_name}
                </Typography>
                <Typography variant={"body2"}>
                  {currentMember?.directus_users_id.email}
                </Typography>
              </Stack>
            </Stack>
            {useRolesAutocomplete ? (
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant={"standard"}
                    type={"text"}
                    label={"Role"}
                    name={"role"}
                    onInput={handleChange}
                    onChange={handleRoleChange}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {jobsLoading && (
                            <CircularProgress color={"primary"} size={20} />
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                autoComplete
                onChange={(e, v: string | EMSIJob | null) => {
                  handleRoleSelect(v);
                }}
                getOptionLabel={(option) => {
                  return typeof option === "string" ? option : option.label!;
                }}
                loading={jobsLoading}
                value={role}
                freeSolo
                options={jobTitles}
                filterOptions={(x) => x}
                disableClearable
              />
            ) : (
              <TextField
                variant={"standard"}
                type={"text"}
                label={"Role"}
                name={"role"}
                value={role}
                onInput={handleChange}
                onChange={handleRoleChange}
              />
            )}
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={came} />}
                label="Came"
                name={"came"}
                onChange={(e) =>
                  handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
              />
            </FormGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button type={"submit"}>Save</Button>
        </DialogActions>
      </form>
    </MemberGlassDialog>
  );
};

const mapStateToProps = (state: any) => ({
  events: eventsSelector(state),
  memberModalId: memberModalIdSelector(state),
  memberUpdateRequestSuccess: memberUpdateRequestSuccessSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMemberModal: (id: string | number) => dispatch(setMemberModalId(id)),
  runMemberUpdateRequest: (memberInfo: PartiesToDirectusUsersModel) =>
    dispatch(runMemberUpdateRequest(memberInfo)),
  setMemberUpdateRequestCompleted: (completed: boolean) =>
    dispatch(setMemberUpdateRequestCompleted(completed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberModal);
