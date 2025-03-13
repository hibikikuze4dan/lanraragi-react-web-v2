import { requestMinionJobStatus } from "../requests/requestMinionJobStatus";

const FINISHED_STATUSES = ["failed", "inactive", "finished"];

export const requestMinionUntilFinished = async ({
  jobId,
  callback = () => null,
}) => {
  const { state } = await requestMinionJobStatus({ jobId: jobId });

  if (FINISHED_STATUSES.includes(state)) {
    return callback();
  } else {
    return await new Promise((resolve) =>
      setTimeout(
        () => resolve(requestMinionUntilFinished({ jobId, callback })),
        500
      )
    );
  }
};
