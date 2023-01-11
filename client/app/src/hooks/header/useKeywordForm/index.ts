import React, { useCallback, useState } from "react";
import { keywordSearchMax } from "shared/constants/TextLength";
import { KeywordFormHandler, UseKeywordFormProps } from "./useKeywordForm.type";

const useKeywordForm = (props: UseKeywordFormProps): [string, KeywordFormHandler] => {
  const [keywrod, setKeyword] = useState("");

  const changeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= keywordSearchMax) {
      setKeyword(e.currentTarget.value);
    }
  }, []);

  return [
    keywrod,
    {
      changeKeyword,
    },
  ];
};

export default useKeywordForm;
