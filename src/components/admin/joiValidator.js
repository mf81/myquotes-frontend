import schema from "./adminValidationSchema";

const joiValidator = (stateToVaid, errorModel) => {
  const { error, value: val } = schema.validate(stateToVaid, {
    abortEarly: false,
  });

  const { details } = { ...error };

  if (error) {
    const arrayObjError = details.map((error) => {
      return { [error.context.label]: error.message };
    });
    const objError = arrayObjError.reduce((r, c) => Object.assign(r, c), {});
    return [{ ...objError }, true];
  } else return [errorModel, false];
};

export default joiValidator;
