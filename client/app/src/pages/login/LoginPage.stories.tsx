import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./index";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default {
  title: "Components/Page/LoginPage",
  component: Component,
  args: {},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <QueryClientProvider client={queryClient}>
    <Component {...args} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {};
