// types/Post.ts
export type PostProps = {
    id: number;
    title: string;
    price: number;
    cant: number;
    description: string;
    image: string;
    haveSend: boolean;
    creationDate: string;
    updateDate: string;
    user: UserProps
    reportedStatus: ReportedStatusProps
    scope: ScopeProps
    category: CategoryProps
    motive: MotiveProps
  };

export type ReportedStatusProps = {
    id: number;
    isAvailable: boolean;
    messageRehabilitation: string;
    creationDate: string;
    updateDate: string;
}

export type MotiveProps = {
    name?: string;
    description?: string;
    id: number;
}

export type CategoryProps = {
    name?: string;
    description?: string;
    id: number;
}

export type ScopeProps = {
    name?: string;
    description?: string;
    id: number;
}

export type UserProps = {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    business?: string | null;
    address: string;
    document: string;
    password: string;
    town: TownProps
    typeDocument: TypeDocumentProps
    permission?: PermissionProps |null
    isAutenticated?: boolean;
    socialMedia?: SocialMediaProps[] | null
}

export type SocialMediaProps = {
    id?: number,
    name: string,
    description: string,
    link: string
}

export type TownProps = {
    id: number;
    name?: string;
    country?: CountryProps
}

export type CountryProps = {
    id: number;
    name?: string;
    prefix?: string;
}

export type TypeDocumentProps = {
    id: number;
    name?: string;
    prefix?: string;
    description?: string;
}

export type PermissionProps = {
    id: number;
    name: string;
}

export type SwalIconType = 'success' | 'error' | 'warning' | 'info' | 'question';

export type TypeValueProps = 'post' | 'category' | 'town' | 'scope' | 'typedocument' | 'user' | 'social-media';