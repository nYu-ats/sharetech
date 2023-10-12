import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PdfIcon } from "./PdfIcon";

export default {
  title: "Components/Assets/Icon/Common/LinkIcon",
  component: PdfIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof PdfIcon>;

const Template: ComponentStory<typeof PdfIcon> = (args) => <PdfIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
