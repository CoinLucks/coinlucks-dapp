import axios from "axios";
import { isEmpty } from "lodash";
import { useQuery, useMutation } from "react-query";

import { AppConfig } from "@/config";
import { ApiRsp } from "@/types/api.rsp";
import { User } from "@/types/user";

const DEFAULT_STALE_TIME = 60 * 1000; // 60 seconds

export function useProfileQuery(id: string) {
  return useQuery(
    ["accountProfile", id],
    async () => {
      return axios
        .get<ApiRsp<User>>(`${AppConfig.apiHost}/api/account/${id}`)
        .then(async (res) => {
          return res.data;
        });
    },
    {
      enabled: !isEmpty(id),
      staleTime: DEFAULT_STALE_TIME,
    }
  );
}

export function useUpdateProfile() {
  return useMutation(async (profile: User) => {
    return axios
      .post<ApiRsp<User>>(`${AppConfig.apiHost}/api/account/profile`, profile, {
        headers: { Authorization: `Bearer ${profile.token}` },
      })
      .then(async (res) => {
        return res.data;
      });
  });
}
