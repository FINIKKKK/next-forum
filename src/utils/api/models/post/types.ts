import { OutputBlockData } from '@editorjs/editorjs';

import { ParamsDto, TBase, TTotal } from '../../types';
import { TCategory } from '../category/types';
import { TTag } from '../tag/types';
import { TUser } from '../user/types';

export type TPosts = TTotal & {
  items: TPost[];
};

export type TPost = TBase & {
  title: string;
  body: OutputBlockData[];
  image: string;
  description: string;
  slug: string;
  user: TUser;
  category: TCategory;
  tags: TTag[];
  views: number;
  commentsCount: number;
  updated: string;
};

export type PostDto = {
  title: string;
  body: OutputBlockData[];
  categoryId?: number;
  tags: TTag[];
};

export type UpdatePostDto = Partial<PostDto>;

export type ParamsPostDto = ParamsDto & {
  orderBy?: string;
  tagBy?: string;
  categoryId?: number;
  userId?: number;
  searchBy?: string;
  favorites?: boolean;
};
