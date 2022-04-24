import { Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import Dropzone from "react-dropzone";

import { StepTabPanel } from "src/components";
import type { MusicTabPanelProps } from "src/types";
import { uploadFiles } from "src/utils";

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
}

export const UiFileInputButton: React.FC<IProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    props.onChange(formData);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <button type="button" onClick={onClickHandler}>
        {props.label}
      </button>
      <input
        accept={props.acceptedFileTypes}
        multiple={props.allowMultipleFiles}
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
      />
    </form>
  );
};

UiFileInputButton.defaultProps = {
  acceptedFileTypes: "",
  allowMultipleFiles: false,
};

const ArtistOwnershipTabPanel: React.FC<MusicTabPanelProps> = ({
  musicMetadata,
  setMusicMetadata,
  ...props
}) => {
  const onChange = async (formData) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/upload-files", formData, config);

    console.log("response", response.data);
  };

  return (
    <StepTabPanel title="Artist Ownership" {...props}>
      <Heading size="sm">What share of this music do you own?</Heading>
      <Input
        placeholder="Enter royalty percentage (%)"
        value={musicMetadata.ownershipPercent || ""}
        onChange={({ target: { value } }) =>
          setMusicMetadata({
            ...musicMetadata,
            ownershipPercent: parseFloat(value),
          })
        }
      />
      <Heading size="sm">What share of this music do you own?</Heading>

      <UiFileInputButton
        label="Upload Single File"
        uploadFileName="file"
        onChange={onChange}
      />
    </StepTabPanel>
  );
};

export { ArtistOwnershipTabPanel };
