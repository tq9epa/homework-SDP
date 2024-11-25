export interface Appointment {
    id?: number;
    title: string;
    start: Date;
    end: Date;
    description: string;
    departmentId: number;
    participants: number[]; 
  }
  
  export interface Department {
    id: number;
    name: string;
    managerId?: number; 
    description?: string;
  }
  
  export interface Employee {
    id: number;
    name: string;
  }