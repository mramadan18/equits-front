import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { lookupService } from "@/services/lookup.service";
import {
  ApiResponse,
  City,
  Country,
  Faculty,
  Industry,
  University,
} from "@/types/api";
import { ApiError } from "@/types/error";

export const useUniversities = () => {
  return useQuery<ApiResponse<University[]>, ApiError>({
    queryKey: queryKeys.lookup.universities,
    queryFn: () => lookupService.getUniversities(),
  });
};

export const useFaculties = () => {
  return useQuery<ApiResponse<Faculty[]>, ApiError>({
    queryKey: queryKeys.lookup.faculties,
    queryFn: () => lookupService.getFaculties(),
  });
};

export const useIndustries = () => {
  return useQuery<ApiResponse<Industry[]>, ApiError>({
    queryKey: queryKeys.lookup.industries,
    queryFn: () => lookupService.getIndustries(),
  });
};

export const useCountries = () => {
  return useQuery<ApiResponse<Country[]>, ApiError>({
    queryKey: queryKeys.lookup.countries,
    queryFn: () => lookupService.getCountries(),
  });
};

export const useCities = (countryId?: number) => {
  return useQuery<ApiResponse<City[]>, ApiError>({
    queryKey: queryKeys.lookup.cities(countryId),
    queryFn: () => lookupService.getCities(countryId),
    enabled: !!countryId,
  });
};
