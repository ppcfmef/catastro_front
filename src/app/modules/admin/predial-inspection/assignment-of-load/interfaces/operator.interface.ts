export interface IResult  {
    count:    number;
    next:     null;
    previous: null;
    results:  IOperator[];
}

export interface IOperator {
    id:            number;
    institution:   number;
    avatar:        null;
    dni:           string;
    firstName:     string;
    lastName:      string;
    email:         string;
    jobTitle:      string;
    role:          number;
    username:      string;
    password:      string;
    isActive:      boolean;
    isWebStaff:    boolean;
    isMobileStaff: boolean;
    department:    string;
    province:      string;
    district:      string;
    observation:   string;
    placeScope:    number;
}
