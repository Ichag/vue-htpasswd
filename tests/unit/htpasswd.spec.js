import { shallowMount } from "@vue/test-utils";
import Htpasswd from "@/components/Htpasswd.vue";

describe("Htpasswd.vue", () => {
  it("renders like snapshot", () => {
    const wrapper = shallowMount(Htpasswd, {});
    expect(wrapper.element).toMatchSnapshot();
  });
});
