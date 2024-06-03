import { ReactElement } from "react";
import useAuth from "hooks/use-auth";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import InputTag from "components/InputTag/InputTag";
import LoaderItem from "components/LoaderItem/LoaderItem";
import { changePasswordSchema } from "helpers/validatioinSchemes";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  currentPassword: string;
  newPassword: string;
};

export function ChangePasswordProfile(): ReactElement {
  const { isLoading, user, changePassword } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (dataForm: FormValues) => {
    if (user) {
      await changePassword({ id: user.id, version: user.version, ...dataForm });
    }
  };

  return (
    <>
      {isLoading && <LoaderItem />}
      <Box>
        <Typography sx={{ p: 0, textAlign: "center" }} variant="h6">
          You can change Password
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid container md={6} sm={8} xs={12} spacing={1} item>
            <Grid item xs={12}>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputTag
                    value={value}
                    type="password"
                    label="Current Password"
                    name={name}
                    onChange={onChange}
                    isError={Boolean(errors?.currentPassword)}
                    message={errors.currentPassword?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="newPassword"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputTag
                    value={value}
                    type="password"
                    label="New Password"
                    name={name}
                    onChange={onChange}
                    isError={Boolean(errors?.newPassword)}
                    message={errors.newPassword?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                sx={{ mt: 2, background: "rgb(70, 163, 88)" }}
                fullWidth
                type="submit"
                loading={isLoading}
                variant="contained"
                color="success"
              >
                Set new password
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
