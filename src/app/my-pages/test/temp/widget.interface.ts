export interface Widget {
  load: () => void;
  refresh: () => void;
  onClickModify: () => void;
  onClickCopy: () => void;
  onClickDelete: () => void;
}
