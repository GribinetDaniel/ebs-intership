export function catchAxiosError(err: any) {
  let errs: Array<{ msg: string; param: string }> = [];
  const obj: any = {};
  errs = err.response.data.errors;
  errs.forEach((err) => (obj[err.param] = err.msg));
  return obj;
}
