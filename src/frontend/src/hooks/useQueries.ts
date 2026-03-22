import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useRemainingSeats() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["remainingSeats"],
    queryFn: async () => {
      if (!actor) return BigInt(43);
      return actor.getRemainingSeats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useRegister() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      country: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.register(data.name, data.email, data.phone, data.country);
    },
  });
}
