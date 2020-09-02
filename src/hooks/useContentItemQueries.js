import { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import config from "../config";
import { useParams, useHistory } from "react-router-dom";

const useContentItemQueries = (model) => {
  const { fields } = model;

  let { contentItemId } = useParams();

  let history = useHistory();

  const initialValues = fields.reduce((acc, curr) => {
    return { ...acc, [curr.name]: curr.schemaType.default || "" };
  }, {});

  const [contentItem, setContentItem] = useState(initialValues);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const [{ data, loading, error }, getContentItem] = useAxios(
    `${config.apiUrl}/api/${model.resourceName}/${contentItemId}`,
    {
      manual: true,
    }
  );

  const [
    { data: putData, loading: putLoading, error: putError },
    executePut,
  ] = useAxios(
    {
      url: `${config.apiUrl}/api/${model.resourceName}/${contentItemId}`,
      method: "PUT",
    },
    { manual: true }
  );

  const [
    { data: postData, loading: postLoading, error: postError },
    executePost,
  ] = useAxios(
    {
      url: `${config.apiUrl}/api/${model.resourceName}`,
      method: "POST",
    },
    { manual: true }
  );

  const [
    { data: postOrderData, loading: postOrderLoading, error: postOrderError },
    executeOrderPost,
  ] = useAxios(
    {
      url: `${config.apiUrl}/api/${model.resourceName}/reorder`,
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    if (!contentItem.id && contentItemId) {
      getContentItem();
    }
  }, [getContentItem, contentItemId, contentItem.id]);

  useEffect(() => {
    if (data) {
      setContentItem(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (putData) {
      setContentItem(putData.data);
    }
  }, [putData]);

  useEffect(() => {
    if (postData) {
      setContentItem(postData.data);
    }
  }, [postData]);

  useEffect(() => {
    if (contentItem?.id && !contentItemId) {
      history.push(`/${model.resourceName}/edit/${contentItem.id}`);
    }
  }, [contentItem, history, contentItemId, model.resourceName]);

  useEffect(() => {
    setLoadingStatus(loading || putLoading || postLoading);
  }, [loading, putLoading, postLoading]);

  useEffect(() => {
    setErrorStatus(error || putError || postError);
  }, [error, putError, postError]);

  return { loadingStatus, errorStatus, contentItem, executePost, executePut, executeOrderPost };
};

export default useContentItemQueries;
