export interface DashboardItem {
    name: string,
    login: string,
    password: string
}

export interface RegisterItem {
   login: string;
   mail: string;
   password1: string;
   password2: string;
   dashBD: DashboardItem[]
};