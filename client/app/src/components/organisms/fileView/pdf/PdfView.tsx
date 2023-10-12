import { FC, memo, useRef } from "react";
import { LoadCallBack, PdfViewProps } from "./PdfView.type";
import { Document, Page, pdfjs } from "react-pdf";
import NormalButton from "components/atoms/button/NormalButton/NormalButton";
import { getIcon } from "assets/icons/Icon.function";
import styles from "./PdfView.module.css";
import useWidth from "hooks/common/useWidth";
import usePaging from "hooks/common/usePaging";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfView: FC<PdfViewProps> = (props) => {
  const wrapperElement = useRef<HTMLDivElement>(null);
  const width = useWidth(wrapperElement);
  const [numPages, pageNumber, pagingHandler] = usePaging({ numPage: 0 });

  const onLoadSuccess: LoadCallBack = ({ numPages }) => {
    pagingHandler.setNumPages(numPages);
  };

  return (
    <div className={[styles.pdfView].join(" ")}>
      <div className={[styles.pdfArea].join(" ")} ref={wrapperElement}>
        <Document
          file={props.fileSource}
          onLoadSuccess={onLoadSuccess}
          onLoadError={() => <div></div>}
          renderMode="canvas"
        >
          <Page
            width={width}
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      <div className={[styles.pdfNav].join(" ")}>
        <NormalButton
          type="button"
          children={getIcon("ARROWLEFT", {
            size: "EXTRASMALL",
            color: "LIGHTGRAY",
          })}
          outline={true}
          disabled={pageNumber <= 1}
          onClick={pagingHandler.goPrevious}
        />
        <div className={[styles.verticalCenter].join(" ")}>
          <p className={[styles.pageIndicator].join(" ")}>
            {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
        </div>
        <NormalButton
          type="button"
          children={getIcon("ARROWRIGHT", {
            size: "EXTRASMALL",
            color: "LIGHTGRAY",
          })}
          outline={true}
          disabled={pageNumber <= 1}
          onClick={pagingHandler.goNext}
        />
      </div>
    </div>
  );
};

export default memo(PdfView);
