export interface IRemoveUserController {
  execute(id: string): Promise<void>;
}
