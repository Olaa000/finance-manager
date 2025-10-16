model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  password  String
  role      String?  @default("user") // user або admin
  createdAt DateTime @default(now())
}
