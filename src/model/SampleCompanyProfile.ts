import { CompanyProfile } from "@/model/CompanyProfile";

export class SampleCompanyProfile implements CompanyProfile {
  name = "Sample company GmbH";
  email = "info@example.com";
  web = "www.example.com";
  address = "Liberty Island, New York 10004, United States";
  place = "New York";
  phone = "(+1) 555 503 3265";
}
