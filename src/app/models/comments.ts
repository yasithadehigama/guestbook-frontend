export interface Comment {
  _id: string;
  comment: string;
  userName: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
}
