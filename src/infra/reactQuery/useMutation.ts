import {
  MutationFunction,
  useMutation as useMutationReactQuery,
  useQueryClient
} from '@tanstack/react-query';

type invalidKeys = string | number;
type invalidKeysObject = {
  exact: boolean;
  key: invalidKeys[];
};

export function useMutation<Input = unknown, Response = void>({
  mutationFn,
  invalidKeys = []
}: {
  mutationFn: MutationFunction<Response, Input>;
  invalidKeys?: (invalidKeys[] | invalidKeys | invalidKeysObject)[];
}) {
  return ({
    onSuccess
  }: {
    onSuccess?: () => void;
  } = {}) => {
    const queryClient = useQueryClient();

    const createOperatorMutation = useMutationReactQuery({
      mutationFn,
      onSuccess: async () => {
        invalidKeys.forEach((keyInput: invalidKeys[] | invalidKeys | invalidKeysObject) => {
          let queryKey = [];
          let exact = true;

          if (Array.isArray(keyInput)) {
            queryKey = keyInput;
          } else if (typeof keyInput === 'object') {
            queryKey = keyInput.key;
            exact = keyInput.exact;
          } else {
            queryKey = [keyInput];
          }

          queryClient.invalidateQueries({
            exact,
            queryKey
          });
        });

        if (onSuccess) {
          onSuccess();
        }
      }
    });

    return createOperatorMutation;
  };
}
