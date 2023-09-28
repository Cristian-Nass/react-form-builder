import { create } from "zustand";
import { ItemDetailsType } from "../types/types";
import { devtools } from "zustand/middleware";

export type UseFormStoreType = {
  formData: ItemDetailsType[];
  setFormData: (formData: ItemDetailsType) => void;
  setUpdateData: (
    id: string,
    updateData: { title?: string; options?: string[] }
  ) => void;
  removeOption: (id: string, item: string) => void;
  addOption: (id: string, option: string) => void;
  deleteFormItem: (id: string) => void;
};

export const useFormStore = create<UseFormStoreType, any>(
  devtools((set) => ({
    formData: [],
    setFormData: (data: any) => {
      set((state) => {
        return {
          formData: [...state.formData, data],
        };
      });
    },
    setUpdateData: (id, updateData) => {
      set((state: any) => {
        return {
          formData: [
            ...state.formData.map((obj: any) => {
              if (obj.id === id) {
                return {
                  ...obj,
                  title: updateData.title,
                  options: updateData.options,
                };
              }
              return obj;
            }),
          ],
        };
      });
    },
    removeOption: (id, index) => {
      set((state) => {
        return {
          formData: [
            ...state.formData.map((obj) => {
              if (obj.id === id) {
                const options = obj.options?.filter((d) => d !== index);
                return {
                  ...obj,
                  options,
                };
              }
              return obj;
            }),
          ],
        };
      });
    },
    addOption: (id, option) => {
      set((state: any) => {
        return {
          formData: [
            ...state.formData.map((obj: any) => {
              if (obj.id === id) {
                // const options: string[] = obj.options?.push(option);
                return {
                  ...obj,
                  options: [...obj.options, option],
                };
              }
              return obj;
            }),
          ],
        };
      });
    },
    deleteFormItem: (id) => {
      set((state) => ({
        formData: state.formData.filter((fd) => fd.id !== id),
      }));
    },
  }))
);
