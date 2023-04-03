import React from "react";
import { addComments } from "../../models/posts";
import { IError } from "../../models/util";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mui/material";
import type { AsyncReturnType } from "type-fest";

export const AddComment = () => {
  const mutation = useMutation<
    AsyncReturnType<typeof addComments>,
    IError,
    Parameters<typeof addComments>[0]
  >(addComments);

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <Button
            onClick={() => {
              mutation.mutate({ body: "asdf" });
            }}
          >
            Create Todo
          </Button>
        </>
      )}
    </div>
  );
};
